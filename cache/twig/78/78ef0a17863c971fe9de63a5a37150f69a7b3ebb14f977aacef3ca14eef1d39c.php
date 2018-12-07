<?php

/* partials/footer.html.twig */
class __TwigTemplate_f71b644304bb981ffe1670af33c1e01021b41a74e720cf7fd7ba08b39c4a66ab extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<footer>
    <div class=\"container\">
        <div class=\"footerRow\">
            <h3>Sign up for e-mail updates</h3>
            <input type=\"email\" name=\"e-mail\" >
            <input class=\"btn\" type=\"submit\"value=\"Subscribe\">
        </div>
        <div class=\"footerRow\">
            <div class=\"menuWrap\">
                <div class=\"menuCol\">
                    <a href=\"#\">products</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"";
        // line 13
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-router\">Router</a>
                        <a href=\"";
        // line 14
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-peeros\">PeerOS</a>
                        <a href=\"";
        // line 15
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-bazaar\">Bazaar</a>
                        <a href=\"";
        // line 16
        echo ($context["base_url"] ?? null);
        echo "/products/subutai-blueprints\">Blueprints</a>
                        <a href=\"";
        // line 17
        echo ($context["base_url"] ?? null);
        echo "/products/khan\">KHAN</a>
                    </div>
                </div>
                <div class=\"menuCol\">
                    <a href=\"#\">about</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"";
        // line 23
        echo ($context["base_url"] ?? null);
        echo "/about/leadership\">Leadership</a>
                        <a href=\"";
        // line 24
        echo ($context["base_url"] ?? null);
        echo "/about/team\">Team</a>
                    </div>
                    <a href=\"https://docs.subutai.io/\" target=\"_blank\">documentation</a>
                    <a href=\"";
        // line 27
        echo ($context["base_url"] ?? null);
        echo "/getting-started\">getting started</a>
                </div>
                <div class=\"menuCol\">
                    <a href=\"#\">ideation</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"#\">Blog</a>
                        <a href=\"#\">Hardware Security</a>
                        <a href=\"";
        // line 34
        echo ($context["base_url"] ?? null);
        echo "/ideation/p2p-cloud\">P2P Cloud</a>
                    </div>
                </div>
            </div> <!-- menu wrap -->
            <div class=\"socialWrap\">
                <h3>Contact us</h3>
                <div class=\"destakLinks-wrap\">
                    <a href=\"https://slack.subutai.io/\" target=\"_blank\">
                        <i class=\"fab fa-slack-hash\"></i>
                        <p>slack.subutai.io</p>
                    </a>
                    <a href=\"https://t.me/SubutaiKHAN\" target=\"_blank\">
                        <i class=\"fab fa-telegram-plane\"></i>
                        <p>subutaiKHAN</p>
                    </a>
                </div> <!-- destakLinks-wrap -->
                <div class=\"socialNav\">
                    <ul>
                        <li>
                            <a href=\"https://www.youtube.com/channel/UCISHGzbHjYWYFfu7krnYLkA\" target=\"_blank\"><i class=\"fab fa-youtube\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.linkedin.com/company/subutai-social-cloud/\" target=\"_blank\"><i class=\"fab fa-linkedin-in\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.reddit.com/r/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-reddit-alien\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://twitter.com/Subutai_KHAN\" target=\"_blank\"><i class=\"fab fa-twitter\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.facebook.com/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-facebook-f\"></i></a>
                        </li>
                    </ul>
                </div>
            </div> <!-- socialWrap -->
        </div> <!-- footerRow -->
        <div class=\"footerRow\">
            <div class=\"logoWrap\">
                <a href=\"";
        // line 73
        echo ($context["base_url"] ?? null);
        echo "\"><img src=\"";
        echo ($context["base_url"] ?? null);
        echo "/images/logo-subutai-web-mono-white.png\"></a>
            </div>
        </div>
    </div>
</footer>";
    }

    public function getTemplateName()
    {
        return "partials/footer.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  120 => 73,  78 => 34,  68 => 27,  62 => 24,  58 => 23,  49 => 17,  45 => 16,  41 => 15,  37 => 14,  33 => 13,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("<footer>
    <div class=\"container\">
        <div class=\"footerRow\">
            <h3>Sign up for e-mail updates</h3>
            <input type=\"email\" name=\"e-mail\" >
            <input class=\"btn\" type=\"submit\"value=\"Subscribe\">
        </div>
        <div class=\"footerRow\">
            <div class=\"menuWrap\">
                <div class=\"menuCol\">
                    <a href=\"#\">products</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"{{ base_url }}/products/subutai-router\">Router</a>
                        <a href=\"{{ base_url }}/products/subutai-peeros\">PeerOS</a>
                        <a href=\"{{ base_url }}/products/subutai-bazaar\">Bazaar</a>
                        <a href=\"{{ base_url }}/products/subutai-blueprints\">Blueprints</a>
                        <a href=\"{{ base_url }}/products/khan\">KHAN</a>
                    </div>
                </div>
                <div class=\"menuCol\">
                    <a href=\"#\">about</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"{{ base_url }}/about/leadership\">Leadership</a>
                        <a href=\"{{ base_url }}/about/team\">Team</a>
                    </div>
                    <a href=\"https://docs.subutai.io/\" target=\"_blank\">documentation</a>
                    <a href=\"{{ base_url }}/getting-started\">getting started</a>
                </div>
                <div class=\"menuCol\">
                    <a href=\"#\">ideation</a>
                    <div class=\"subItems-wrap\">
                        <a href=\"#\">Blog</a>
                        <a href=\"#\">Hardware Security</a>
                        <a href=\"{{ base_url }}/ideation/p2p-cloud\">P2P Cloud</a>
                    </div>
                </div>
            </div> <!-- menu wrap -->
            <div class=\"socialWrap\">
                <h3>Contact us</h3>
                <div class=\"destakLinks-wrap\">
                    <a href=\"https://slack.subutai.io/\" target=\"_blank\">
                        <i class=\"fab fa-slack-hash\"></i>
                        <p>slack.subutai.io</p>
                    </a>
                    <a href=\"https://t.me/SubutaiKHAN\" target=\"_blank\">
                        <i class=\"fab fa-telegram-plane\"></i>
                        <p>subutaiKHAN</p>
                    </a>
                </div> <!-- destakLinks-wrap -->
                <div class=\"socialNav\">
                    <ul>
                        <li>
                            <a href=\"https://www.youtube.com/channel/UCISHGzbHjYWYFfu7krnYLkA\" target=\"_blank\"><i class=\"fab fa-youtube\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.linkedin.com/company/subutai-social-cloud/\" target=\"_blank\"><i class=\"fab fa-linkedin-in\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.reddit.com/r/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-reddit-alien\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://twitter.com/Subutai_KHAN\" target=\"_blank\"><i class=\"fab fa-twitter\"></i></a>
                        </li>
                        <li>
                            <a href=\"https://www.facebook.com/SubutaiKHAN/\" target=\"_blank\"><i class=\"fab fa-facebook-f\"></i></a>
                        </li>
                    </ul>
                </div>
            </div> <!-- socialWrap -->
        </div> <!-- footerRow -->
        <div class=\"footerRow\">
            <div class=\"logoWrap\">
                <a href=\"{{ base_url }}\"><img src=\"{{ base_url }}/images/logo-subutai-web-mono-white.png\"></a>
            </div>
        </div>
    </div>
</footer>", "partials/footer.html.twig", "/Users/fernandoted/Sites/subutai/website/user/themes/subutai/templates/partials/footer.html.twig");
    }
}
